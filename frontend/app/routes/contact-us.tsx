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
            <label>
              Name: <input type="text" name="name" />
            </label>
          </p>
          <p>
            <label>
              Email: <input type="text" name="email" />
            </label>
          </p>
          <p>
            <label>
              description: <textarea name="description" />
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
