"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import MobileHeader from "./MobileHeader";
import HeaderSearch from "./HeaderSearch";

import api from "@/libs/axios";
import { useProfile } from "@/context/ProfileContext";

const BottomHeader = () => {
  const router = useRouter();
  const { profile, setProfile } = useProfile();

  const logout = async () => {
    try {
      const response = await api.post("/api/logout");
      const meta = response?.data?.meta;

      if (!meta || meta.errors) {
        return toast.error(meta?.message || "Something went wrong!");
      }

      toast.success(meta.message);
      localStorage.removeItem("_bl_tk");
      setProfile(undefined);
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed, please try again.");
    }
  };

  return (
    <div className="bottom-header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="inner-bottom-header">
              <div className="cols bb-logo-detail">
                {/* Header Logo Start */}
                <div className="header-logo">
                  <Link href={`/`}>
                    <Image
                      src="/assets/img/logo/logo.png"
                      className="light"
                      alt="logo"
                      width={125}
                      height={43}
                      priority
                    />
                  </Link>
                </div>
              </div>
              <div className="cols">
                <HeaderSearch />
              </div>
              <div className="cols bb-icons">
                <div className="bb-flex-justify">
                  <div className="bb-header-buttons">
                    <div className="bb-acc-drop">
                      <div
                        className="bb-header-btn bb-header-user dropdown-toggle bb-user-toggle"
                        title="Account"
                      >
                        <div className="header-icon">
                          {profile && (
                            <Image
                              src={profile?.avatar || ""}
                              alt={profile?.fullName || "avatar"}
                              width={30}
                              height={30}
                            />
                          )}
                        </div>
                        <div className="bb-btn-desc">
                          <span className="bb-btn-title">Tài khoản</span>
                          <span className="bb-btn-stitle">
                            {profile?.fullName}
                          </span>
                        </div>
                      </div>
                      <ul className="bb-dropdown-menu">
                        {!profile && (
                          <Fragment>
                            <li>
                              <Link
                                href={`/register`}
                                className="dropdown-item"
                              >
                                Register
                              </Link>
                            </li>
                            <li>
                              <Link href={`/login`} className="dropdown-item">
                                Login
                              </Link>
                            </li>
                          </Fragment>
                        )}
                        {profile && (
                          <Fragment>
                            <li>
                              <Link href={`/profile`} className="dropdown-item">
                                Profile
                              </Link>
                            </li>
                            <li>
                              <span
                                style={{ cursor: "pointer" }}
                                className="dropdown-item"
                                onClick={logout}
                              >
                                Logout
                              </span>
                            </li>
                          </Fragment>
                        )}
                      </ul>
                    </div>

                    <MobileHeader />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomHeader;
