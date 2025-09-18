import { useActionState } from "react";

export function NewOpinion() {
  const newOpinionAction = (prevState, formData) => {
    const username = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (!username.trim()) errors.push("Username is required");
    if (title.trim().length < 5)
      errors.push("Enter a valid title atleast 5 characters.");
    if (body.trim().length < 10 || body.trim().length > 300)
      errors.push("Opinion must be between 10 and 300 characters long.");

    if (errors.length > 0)
      return { errors, enteredValues: { username, title, body } };

    return { errors: null };
  };

  const [formState, formAction] = useActionState(newOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.username}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
