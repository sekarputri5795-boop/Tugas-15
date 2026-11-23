import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const itemId = Number(id);

    if (!Number.isInteger(itemId) || itemId <= 0) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const body = await request.json();
    const data: { name?: string; note?: string | null } = {};

    if (typeof body.name === "string") {
      const trimmed = body.name.trim();
      if (!trimmed) {
        return NextResponse.json(
          { error: "Name tidak boleh kosong" },
          { status: 400 }
        );
      }
      data.name = trimmed;
    }

    if (body.note !== undefined) {
      data.note = typeof body.note === "string" ? body.note.trim() || null : null;
    }

    const updated = await prisma.item.update({
      where: { id: itemId },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/items/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate item" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const itemId = Number(id);

    if (!Number.isInteger(itemId) || itemId <= 0) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    await prisma.item.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ message: "Item berhasil dihapus" });
  } catch (error) {
    console.error("DELETE /api/items/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus item" },
      { status: 500 }
    );
  }
}