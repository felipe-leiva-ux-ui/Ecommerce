import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#42b883",
          secondary: "#2c3e50",
          error: "#e74c3c",
        },
      },
      dark: {
        colors: {
          primary: "#42b883",
          secondary: "#ecf0f1",
          error: "#e74c3c",
        },
      },
    },
  },
});
