import { Box } from "@mui/material"
import Head from "next/head"
import { FC } from "react";
import { Navbar, Sidebar } from "../ui";

interface Props {
    title?: string;
    children: JSX.Element
}

export const Layout: FC<Props> = ({ title = 'Open Jira', children }) => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar/>
            <Sidebar/>
            <Box sx={{ padding: '10px 20px'}}>
                {children}
            </Box>
        </Box>
    )
}