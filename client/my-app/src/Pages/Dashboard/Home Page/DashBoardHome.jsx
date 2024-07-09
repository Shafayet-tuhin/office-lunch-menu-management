import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthProvider";
import { PieChart } from "react-minimal-pie-chart";
import { GrUserAdmin } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
const token = localStorage.getItem('token')
import { FaUserTie } from "react-icons/fa";

// Function to fetch menu data from the API
const fetchMenuData = async () => {
    const { data } = await axios.get("https://bistro-boss-roan.vercel.app/menu");
    return data;
};

// Function to fetch users data from the API
const fetchUsersData = async () => {
    const { data } = await axios.get("https://bistro-boss-roan.vercel.app/users");
    return data;
};

const DashBoardHome = () => {
    const { user, isAdmin } = useContext(AuthContext);
    console.log(user)

    // Use React Query to fetch menu data
    const {
        data: menuData,
        error: menuError,
        isLoading: menuLoading,
    } = useQuery({
        queryKey: ["menuData"],
        queryFn: fetchMenuData,
    });

    // Use React Query to fetch users data
    const {
        data: usersData,
        error: usersError,
        isLoading: usersLoading,
    } = useQuery({
        queryKey: ["usersData"],
        queryFn: fetchUsersData,
    });

    // Handle loading state
    if (menuLoading || usersLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    // Handle error state
    if (menuError || usersError) {
        return <div>Error loading data</div>;
    }

    // Process menu data to generate chart data
    const chartData = menuData.reduce((acc, item) => {
        const category =
            item.category.charAt(0).toUpperCase() + item.category.slice(1);
        const existingCategory = acc.find((entry) => entry.title === category);

        if (existingCategory) {
            existingCategory.value += 1;
        } else {
            acc.push({ title: category, value: 1, color: getRandomColor() });
        }
        return acc;
    }, []);

    // Process users data to get counts of each role
    const roleCounts = usersData.reduce(
        (acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
        },
        { user: 0, admin: 0 }
    );

    // Function to generate a random color
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div>
            <div className="flex flex-col items-center gap-4 mt-8 ">
                <p className="text-[#D99904] italic text-xl font-normal ">
                    ---Dashboard Home Page---
                </p>
                <hr className="w-[22rem]" />
                <p className="text-[#151515] font-normal text-[2.5rem] font-abc">
                    Welcome Back, {user.displayName}
                </p>
            </div>

            <div className="flex justify-center mt-8">
                <div className="bg-slate-200 px-14 py-5 flex flex-col items-center gap-3 rounded-3xl">
                    {
                        user.photoURL ? <img className="w-[10rem] rounded-full border-4 p-1 border-sky-300" src={user.photoURL} alt="" /> : <FaUserTie className="text-[7rem] " />
                    }

                    <div className="flex justify-between text-xl gap-4 items-center">
                        <p>{user.displayName}</p>
                        <p className="bg-cyan-700 animate-pulse text-white rounded-xl px-2 py-1"> {isAdmin ? "Admin" : "User"} </p>
                    </div>
                    <p className="text-lg ">{user.email}</p>

                </div>
            </div>

            <div className="flex flex-col">
                <div>
                    <h3 className="text-lg font-bold mt-8">Users Pie-Chart</h3>
                    <PieChart className="mt-[-5rem]"
                        data={[
                            {
                                title: `Admins : ${roleCounts.admin}`,
                                value: roleCounts.admin,
                                color: "#94B6FF",
                            },
                            {
                                title: `Users : ${roleCounts.user} `,
                                value: roleCounts.user,
                                color: "#FFC311",
                            },
                        ]}
                        label={({ dataEntry }) => dataEntry.title}
                        labelStyle={{
                            fontSize: "2.5px",
                            fontFamily: "sans-serif",
                            fill: "#121212",
                        }}
                        radius={28}
                        labelPosition={112}
                        lineWidth={20}
                        paddingAngle={5}
                    />
                </div>

                <div>
                    <h3 className="text-lg font-bold mt-8">Product Pie-Chart</h3>
                    <PieChart className="mt-[-4rem]"
                        data={chartData.map((entry) => ({
                            ...entry,
                            title: `${entry.title} `,
                        }))}
                        label={({ dataEntry }) => dataEntry.title}
                        labelStyle={{
                            fontSize: "2.5px",
                            fontFamily: "sans-serif",
                            fill: "#121212",
                        }}
                        radius={28}
                        labelPosition={112}
                        lineWidth={20}
                        paddingAngle={5}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashBoardHome;
