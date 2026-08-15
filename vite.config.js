import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// GitHub project page: served at /wearformaia/
export default defineConfig({
    base: "/wearformaia/",
    plugins: [react()],
});
