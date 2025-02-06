import dynamic from "next/dynamic";

export const Interaction = dynamic(() => import("./Interaction"), { ssr: false, loading: () => null });
