import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from '../contact.js'

export async function action({ request ,params}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}


export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" className="flex flex-col justify-center gap-16">
      <p className="flex gap-8">
        <span >Name</span>
        <input
            className="px-2 py-1"
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
            className="px-2 py-1"
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
            className="px-2 py-1 ml-8"
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          className="px-2 py-1 ml-2 w-72"
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span className="">Notes</span>
        <textarea
            className="px-2 py-1 ml-8 w-80"
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button className="ml-28 rounded-sm px-2 py-1 bg-slate-600 mr-12 text-white hover:bg-slate-800" type="submit">Save</button>
        <button className="ml-12 rounded-sm px-2 py-1 bg-slate-600 text-white hover:bg-slate-800" onClick={() => { navigate(-1) }} type="button">Cancel</button>
      </p>
    </Form>
  );
}