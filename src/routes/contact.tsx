import { Form, useLoaderData , useFetcher} from "react-router-dom";
import { getContact, updateContact } from '../contact.js'



interface Props {
    first: string;
    last: string;
    avatar: string;
    twitter: string;
    notes: string;
    favorite: boolean;
}



export async function loader({params}){
    const contact = await getContact(params.contactId); 
    return { contact };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}


export default function Contact() {
    const { contact } = useLoaderData();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="object-contain h-72 w-72 mb-16">
        <img className="w-full h-full rounded-lg"
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div className="m-4">
        <h1 className="w-full flex justify-center text-[30px]">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact ={contact} />
        </h1>

        {contact.twitter && (
          <p className="mb-8 font-light italic font-mono text-[15px]">
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div className="flex justify-around items-center mt-8">
          <Form action="edit">
            <button className="rounded-lg w-32 hover:bg-green-300 hover:text-slate-900 bg-slate-700 text-slate-300 px-2 py-1 " type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button className="rounded-lg w-32 hover:bg-red-400  hover:text-slate-900 bg-slate-700 text-slate-300 px-2 py-1" type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}


function Favorite({ ...contact }: Props) {
  const fetcher = useFetcher();
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <fetcher.Form method="post" className="pl-8">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}