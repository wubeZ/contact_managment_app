import { Outlet, NavLink, useNavigation ,useLoaderData, Form, redirect, useSubmit } from "react-router-dom";
import  {getContacts, createContact } from '../contact.js'
import { useEffect } from "react";

export async function action(){
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
    const {contacts , q } = useLoaderData();  
    const navigation = useNavigation();
    const submit = useSubmit();

    useEffect(() => {
      const searchBar = document.getElementById("q") as HTMLInputElement ;
      searchBar.value = q;
    }, [q]);

    return (
      <div className="flex h-screen w-full ">
        <div className="flex flex-col p-8 border-r h-full mt-12">
          <h1 className="text-2xl mb-4">React Router Contacts</h1>
          <div className="mt-4 border flex justify-between items-center">
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                className="pl-4 py-1"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(e)=>{
                  submit(e.currentTarget.form)
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            
            <Form method="post">
              <button className="border rounded-sm bg-slate-700 text-white py-1 px-2" type="submit">New</button>
            </Form>
          </div>

          <nav className="mt-8">
            {contacts.length ? (
              <ul className="flex flex-col gap-8 items-center">
                {contacts.map((contact) => (
                  <li className="border rounded-sm px-2 py-1 bg-slate-200 w-40 text-center" key={contact.id}>
                    <NavLink to={`contacts/${contact.id}`} className={({ isActive, isPending }) =>
                      isActive
                        ? "text-slate-700 font-bold"
                        : isPending
                        ? "text-slate-300 font-bold"
                        : ""
                    }>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>


        </div>
        <div className={`flex w-full h-full  bg-slate-100 justify-center items-center  ${navigation.state === "loading" ? "blur-sm" : "" }`}>
          <Outlet />
        </div>
      </div>
    );
  }