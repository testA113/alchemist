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
              Thanks for enquiring about our portable premium bar service, we
              are excited to learn more about your function!
            </p>
            <p className="mb-4">
              Our functions coordinator, Jazmin Campbell, will be in touch
              shortly to understand your requirements - you can contact her on{" "}
              <a
                aria-label="Phone"
                href="tel: +64226834889"
                className="underline"
              >
                022 683 4889
              </a>
              !
            </p>
            <p className="mb-4">
              In the meantime check out our work, or what we've been up to on
              our socials below.
            </p>
            <p className="mb-4">Speak to you soon!</p>
            <p className="mb-4">Best Wishes, Alchemist Mixology</p>
          </div>
        </div>
      </section>
    </div>
  );
}
