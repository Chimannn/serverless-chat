import createInstance from "./Instance.js";

function renderMsg(typeCfg = {}, cfg = "") {
    const isContent = typeof cfg === "string"
    cfg = isContent ? {
        content: cfg
    } : cfg 

    const config = Object.assign({}, typeCfg, cfg)

    const {
        type = "text",
        content = "",
        icon = "",
        duration = 2800,
        close = false
    } = config

    return createInstance({
        type,
        content,
        icon,
        duration,
        close
    })
}

export default {
    // 纯文本消息
    text(cfg = "") {
      const textCfg = {
        type: "text",
        icon: 'ri-notification-4-line'
      }
  
      return renderMsg(textCfg, cfg);
    },
    // 成功提示
    success(cfg = "") {
      const successCfg = {
        type: "success",
        icon: 'ri-checkbox-circle-fill'
      }
  
      return renderMsg(successCfg, cfg);
    },
    // 错误提示
    error(cfg = "") {
      const errorCfg = {
        type: "error",
        icon: 'ri-close-circle-fill'
      }
  
      return renderMsg(errorCfg, cfg);
    },
  }