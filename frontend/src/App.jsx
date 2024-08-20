import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  usePostUserMutation,
  useUpdateUserMutation,
} from "./redux/UserApi";

export default function App() {
  // get user
  const { data: users, isLoading, refetch } = useGetUsersQuery();
  //post user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postUser] = usePostUserMutation();
  const AddPost = (e) => {
    e.preventDefault();
    const datav = {
      name: name,
      email: email,
    };
    postUser(datav);
    refetch();
  };

  // delete user
  const [deleteUser] = useDeleteUserMutation();

  // for updating
  const [updateUser] = useUpdateUserMutation();
  const [select, setSelect] = useState(null);
  useEffect(() => {
    if (select) {
      setName(select.name);
      setEmail(select.email);
    }
  }, [select]);

  const UpdatePost = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
    };
    updateUser({ id: select._id, data });
    refetch();
  };
  return (
    <div>
      <h1 className="text-center my-7 font-bold text-2xl ">Add User</h1>
      <form
        onSubmit={select ? UpdatePost : AddPost}
        className="flex flex-col items-center gap-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Your Name"
          className="w-1/3 p-2 text-black"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Your Email"
          className="w-1/3 p-2 text-black"
        />
        <button className="bg-red-500 px-16 py-2 rounded-md">
          {select ? "Update" : "Save"}
        </button>
      </form>

      <div className=" mt-10 flex justify-center w-full">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SN
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.data.map((item, index) => {
                return (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.email}</td>

                    <td className="flex gap-4">
                      <button
                        onClick={() => {
                          setSelect(item);
                        }}
                        className="pl-6 py-4 "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteUser(item._id);
                          refetch();
                        }}
                        className=" py-4 pr-2 text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
