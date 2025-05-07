import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";

const LeftNav = () => {
    const { selectedCategory, setSelectedCategory, mobileMenu, loading } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const clickHandler = (name, type) => {
        switch (type) {
            case "category":
                return setSelectedCategory(name);
            case "home":
                return setSelectedCategory(name);
            case "menu":
                return false;
            default:
                break;
        }
    };

    return (
        <div
            className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
                mobileMenu ? "translate-x-0" : ""
            }`}
        >
            {/* Content with staggered loading */}
            <div className={`flex px-5 flex-col transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {categories.map((item, index) => (
                    <React.Fragment key={item.name}>
                        <div 
                            className={`transition-all duration-300 ${isLoading ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'}`}
                            style={{ transitionDelay: isLoading ? '0ms' : `${index * 30}ms` }}
                        >
                            <LeftNavMenuItem
                                text={item.type === "home" ? "Home" : item.name}
                                icon={item.icon}
                                action={() => {
                                    clickHandler(item.name, item.type);
                                    navigate("/");
                                }}
                                className={`${
                                    selectedCategory === item.name
                                        ? "bg-white/[0.15]"
                                        : ""
                                }`}
                            />
                        </div>
                        {item.divider && (
                            <hr className="my-5 border-white/[0.2]" />
                        )}
                    </React.Fragment>
                ))}
                <hr className="my-5 border-white/[0.2]" />
                <div 
                    className={`text-white/[0.5] text-[12px] transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    style={{ transitionDelay: isLoading ? '0ms' : `${categories.length * 30 + 100}ms` }}
                >
                    Developed by Tanish Jangra
                </div>
            </div>
        </div>
    );
};

export default LeftNav;