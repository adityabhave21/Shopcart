import { WEBSERVICE_DIALOGS } from "../../constants/dialog.constants";

export function callWebService(props, id, BodyParams, apiName) {
  const { requestData } = props;
  const Params = {
    id,
    api: {
      body: BodyParams,
      apiName,
    },
  };

  return requestData(Params)
    .then((dataMap) => {
      if (dataMap.apiData && dataMap.apiData.response) {
        const message = dataMap.apiData.response;
        if (message === "failure") {
          return { message, apiData: "" };
        } else if (message === WEBSERVICE_DIALOGS.saveSuccessMsg1) {
          return { message, apiData: dataMap.apiData.response };
        }
      } else {
        return { message: "Connection issue", apiData: "" };
      }
    })
    .catch(function (error) {
      return { message: "Connection issue", apiData: "" };
    });
}
