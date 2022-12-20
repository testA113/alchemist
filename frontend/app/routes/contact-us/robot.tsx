import { Link } from "@remix-run/react";

export default function ContactUsRobot() {
  return (
    <div className="min-h-minpage pt-32">
      <section className="bg-base-100 px-10vw flex w-full !max-w-full flex-col items-center py-12">
        <div className="prose md:prose-lg lg:prose-xl mb-12">
          <h1>Are you a robot?</h1>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-center">
            <p className="mb-4">
              It seems that you're a robot! Congratulations on finding Alchemist
              Mixology! If you're not a robot, please go back to the{" "}
              <Link to="/contact-us" prefetch="intent" className="link">
                contact form
              </Link>{" "}
              and try again.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
