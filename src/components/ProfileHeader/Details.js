import React from "react";
import { useSelector } from "react-redux";

function Details() {
  const user = useSelector((state) => state.user);
  //   since join
  let sinceJoin = new Date(user?.createdAt).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <>
        <div class="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
          <div class="flex flex-col items-center pb-10">
            <img
              class="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={user.profileImage}
              alt="Bonnieimage"
            />

            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.fullName}
            </h5>
            {/* <span class="text-sm text-gray-500 dark:text-gray-400">
              Visual Designer
            </span> */}
            {/* <div class="flex mt-4 md:mt-6">
              <a
                href="##"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Details
              </a>
              <a
                href="##"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
              >
                Edit
              </a>
            </div> */}
          </div>

          <div class="flow-root">
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
              <li class="py-3 sm:py-4">
                <div class="flex items-center">
                  <div class="flex-1 min-w-0 ms-4">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {user.fullName}
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </p>
                    {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.sinceJoin}
                    </p> */}
                  </div>
                  {/* <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {user.do}
                  </div> */}
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex items-center">
                  <div class="flex-1 min-w-0 ms-4">
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        Since Join
                      </span>
                      {"  "}
                      {sinceJoin}
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        DOB
                      </span>
                      {"  "}
                      {user.dob}
                    </p>
                  </div>
                  {/* <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white mr-4">
                    DOB: {user.dob}
                  </div> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    </>
  );
}

export default Details;

{
  /* <img src={user.profileImage} />; */
}
{
  /* Details */
}
{
  /* <div className="profile__details"> */
}
{
  /* Single Details */
}
//   <div className="single__details">
//     <label>Full Name: </label>
//     <p>{user.fullName}</p>
//   </div>
//   <div className="single__details">
//     <label>Email: </label>
//     <p>{user.email}</p>
//   </div>
//   <div className="single__details">
//     <label>Gender: </label>
//     <p>{user.gender}</p>
//   </div>
//   <div className="single__details">
//     <label>DOB: </label>
//     <p>{user.dob}</p>
//   </div>
//   <div className="single__details">
//     <label>Member Since: </label>
//     <p>{sinceJoin}</p>
//   </div>
//   <div className="single__details">
//     <label>About: </label>
//     <p>Lorem some things details about yourself</p>
//   </div>
// </div>;
