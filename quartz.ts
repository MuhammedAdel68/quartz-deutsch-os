import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const config = await loadQuartzConfig()
export default config

const customLayout = await loadQuartzLayout()
export const layout = customLayout
