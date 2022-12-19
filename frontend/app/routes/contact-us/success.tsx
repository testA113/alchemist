
export default function ContactUsSuccess() {
  return (
    <div className="min-h-minpage pt-32">
      <section className="bg-base-100 px-10vw flex w-full !max-w-full flex-col items-center py-12">
        <div className="prose md:prose-lg lg:prose-xl mb-12">
          <h1>We got your message!</h1>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-center">
            <p className="mb-4">
              We'll be in touch with you shortly. In the meantime check out our
              work, or what we've been up to on our socials below.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
