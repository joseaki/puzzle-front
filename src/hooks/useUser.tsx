import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const useUser = () => {
  const [user, setUser] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      if (router.pathname.includes("order")) {
        router.replace("/login");
      }
      return;
    }
    const decoded: any = jwt_decode(token);
    setUser(decoded.username);
  }, [router]);
  return { user };
};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
