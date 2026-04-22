export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-hogwarts-parchment py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-harry text-4xl text-gryffindor-primary mb-6 text-center">
          Política de Privacidad
        </h1>
        <div className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-lg text-black space-y-4">
          <p>
            Este sitio es un proyecto educativo y de demostración basado en el universo de
            Harry Potter. No recopilamos datos personales de los visitantes.
          </p>
          <p>
            Toda la información mostrada es de carácter ficticio y pertenece al universo
            creado por J.K. Rowling.
          </p>
          <p>
            Si tienes alguna pregunta, puedes contactarnos a través de la página de contacto.
          </p>
        </div>
      </div>
    </main>
  );
}
