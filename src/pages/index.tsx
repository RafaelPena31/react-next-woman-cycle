import { CyclePage } from "@/modules/cycle/CyclePage";
import { LocalizationProvider, ptBR } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Head from "next/head";
import "dayjs/locale/pt-br";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function Home() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#eab1e8",
      },
    },
  });

  return (
    <>
      <Head>
        <title>Woman Cycle - A sua calculadora de ciclos menstruais</title>
        <meta name="description" content="Ciclo menstrual feminino" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="pt-br"
          localeText={
            ptBR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <CyclePage />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
