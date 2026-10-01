import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Notas Efímeras — Demo de ambientes efímeros" },
      {
        name: "description",
        content:
          "Aplicación sencilla de notas usada para demostrar el despliegue y los ambientes efímeros de pruebas.",
      },
      { property: "og:title", content: "Notas Efímeras — Demo de ambientes efímeros" },
      {
        property: "og:description",
        content:
          "Aplicación sencilla de notas usada para demostrar el despliegue y los ambientes efímeros de pruebas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Nota = { id: number; texto: string; fecha: string };

const STORAGE_KEY = "notas-efimeras";

function Index() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    try {
      const guardadas = window.localStorage.getItem(STORAGE_KEY);
      if (guardadas) setNotas(JSON.parse(guardadas));
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [notas]);

  const agregarNota = () => {
    const limpio = texto.trim();
    if (!limpio) return;
    setNotas((prev) => [
      { id: Date.now(), texto: limpio, fecha: new Date().toLocaleString("es-MX") },
      ...prev,
    ]);
    setTexto("");
  };

  const eliminarNota = (id: number) => {
    setNotas((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Tendencias en Entornos de Desarrollo
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
            Notas Efímeras
          </h1>
          <p className="mt-3 text-muted-foreground">
            Aplicación de demostración para el despliegue con ambientes efímeros de
            pruebas. Cada despliegue de prueba nace, se valida y se destruye sin
            afectar producción.
          </p>
        </header>

        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex gap-2">
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && agregarNota()}
              placeholder="Escribe una nota de prueba…"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={agregarNota}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Agregar
            </button>
          </div>

          <ul className="mt-6 space-y-3">
            {notas.length === 0 && (
              <li className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                Aún no hay notas. Agrega la primera para probar la aplicación.
              </li>
            )}
            {notas.map((nota) => (
              <li
                key={nota.id}
                className="flex items-start justify-between gap-3 rounded-md border bg-background p-4"
              >
                <div>
                  <p className="text-sm text-foreground">{nota.texto}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{nota.fecha}</p>
                </div>
                <button
                  onClick={() => eliminarNota(nota.id)}
                  className="rounded-md px-2 py-1 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-8 text-center text-xs text-muted-foreground">
          Desplegada como demostración de ambientes efímeros: cada rama de prueba
          genera su propio entorno temporal.
        </footer>
      </div>
    </main>
  );
}
