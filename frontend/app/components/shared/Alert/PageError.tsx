import { Alert } from "./Alert";

const fallbackMessage =
  "There was an error loading the page. Sorry! In the meantime, connect with us on our socials.";

export function PageError({ message = fallbackMessage }: { message?: string }) {
  return (
    <div className="min-h-minpage">
      <div className="flex flex-col items-center">
        <Alert mode="error" message={message} />
      </div>
    </div>
  );
}
