import { UAParser } from "ua-parser-js";

export function getDeviceDetails(ipData = {}, deviceId = "") {
  const parser = new UAParser();
  const result = parser.getResult();
  return {
    ip: "",
    country: "",
    browser: result.browser.name,
    browserVersion: result.browser.version,
    os: result.os.name,
    osVersion: result.os.version,
    deviceType: result.device.type || "desktop",
    model: result.device.model || "",
    vendor: result.device.vendor || "",
    deviceId,
  };
}
