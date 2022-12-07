import { type ActionFunction, redirect } from "@remix-run/node";
import clsx from "clsx";

// contact form submission handler
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  console.log(request);
  return redirect("/contact-us");
};

export default function ContactUs() {
  return (
    <section
      className={clsx(
        "flex flex-col bg-base-100",
        "w-full !max-w-full items-center pt-48 pb-24 px-10vw"
      )}
    >
      <div className="prose mb-12 md:prose-lg lg:prose-xl">
        <h1>Contact Us</h1>
      </div>
      <form method="post">
        <div className="flex flex-col gap-y-4">
          <p>
            <label className="flex flex-col">
              Hi, my name is:
              <input
                name="name"
                type="text"
                placeholder="Slim Shady"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </p>
          <p>
            <label className="flex flex-col">
              You can reach me at:
              <input
                name="email"
                type="text"
                placeholder="Your email address"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </p>
          <p>
            <label className="flex flex-col">
              And here's some info about my event:
              <textarea
                name="description"
                className="textarea textarea-bordered"
                placeholder="A bespoke wedding cocktail bar. Guest numbers.. Favourite drinks.."
              ></textarea>
            </label>
          </p>
          <button className="btn btn-primary btn-lg" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
