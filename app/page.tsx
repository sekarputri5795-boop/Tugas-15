"use client";

import { useEffect, useState, FormEvent } from "react";

type Item = {
  id: number;
  name: string;
  note: string | null;
  createdAt: string;
};

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editNote, setEditNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function fetchItems() {
    try {
      setErrorMsg(null);
      const res = await fetch("/api/item", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal memuat data item");
      const data: Item[] = await res.json();
      setItems(data);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  }

  useEffect(() => {
    let active = true;

    fetch("/api/item", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Gagal memuat data item");
        return (await res.json()) as Item[];
      })
      .then((data) => {
        if (active) {
          setErrorMsg(null);
          setItems(data);
        }
      })
      .catch((err) => {
        if (active) {
          setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch("/api/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), note: note.trim() || null }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Gagal menambah item");
      }
      setName("");
      setNote("");
      await fetchItems();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setEditName(item.name);
    setEditNote(item.note ?? "");
  }

  async function handleUpdate(id: number) {
    if (!editName.trim()) return;

    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch(`/api/item/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          note: editNote.trim() || null,
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Gagal mengupdate item");
      }
      setEditingId(null);
      await fetchItems();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch(`/api/item/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Gagal menghapus item");
      }
      await fetchItems();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">CRUD Item (Prisma + SQLite)</h1>
        <p className="text-sm text-gray-500">
          Tambah, lihat, edit, dan hapus data langsung ke database SQLite lokal.
        </p>
      </div>

      {errorMsg && (
        <div className="rounded border border-red-400 bg-red-50 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleCreate} className="space-y-3 rounded border p-4">
        <h2 className="font-semibold">Tambah Item Baru</h2>
        <input
          type="text"
          placeholder="Nama item (wajib)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm"
          required
        />
        <input
          type="text"
          placeholder="Catatan (opsional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Tambah Item"}
        </button>
      </form>

      <div className="space-y-2">
        <h2 className="font-semibold">Daftar Item ({items.length})</h2>
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada data item.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-2 rounded border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                {editingId === item.id ? (
                  <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 rounded border px-2 py-1 text-sm"
                    />
                    <input
                      type="text"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      placeholder="Catatan"
                      className="flex-1 rounded border px-2 py-1 text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.note && (
                      <p className="text-sm text-gray-500">{item.note}</p>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  {editingId === item.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleUpdate(item.id)}
                        disabled={loading}
                        className="rounded bg-blue-600 px-3 py-1 text-xs text-white"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded border px-3 py-1 text-xs"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="rounded border px-3 py-1 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={loading}
                        className="rounded bg-red-600 px-3 py-1 text-xs text-white"
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}