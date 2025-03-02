import f from "../commonindex.js";

export default f(
    "lyrics",
    "lyrics",
    {
    templateEngineOverride: data => data.index ? "liquid" : "mdbreaks",
    }
);
