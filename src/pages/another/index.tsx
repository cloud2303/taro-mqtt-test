import { View, Text } from "@tarojs/components";
import { useMqttStore } from "@/store";
import { useEffect } from "react";
import "./index.scss";


export default function Another() {
  const { client, initMqttClient, subscribeMqttTopic, unsubscribeMqttTopic } =
    useMqttStore((state) => {
      return {
        client: state.client,
        initMqttClient: state.initMqttClient,
        sendMqttMessage: state.sendMqttMessage,
        subscribeMqttTopic: state.subscribeMqttTopic,
        unsubscribeMqttTopic: state.unsubscribeMqttTopic,
      };
    });
  const topic = "fujiahui";
  useEffect(() => {
    if (!client) return;
    client.on("connect", function () {
      console.log("another页面")
      console.log("连接成功");
    });
    client.on("reconnect", function () {
      console.log("another页面")
      console.log("正在重连");
    });
    client.on("message", function (topic1, message) {
      console.log("another页面")
      // message is Buffer
      console.log(topic1);
      console.log(message.toString());
    });
    client.on("error", function (error) {
      console.log("another页面")
      console.log(error);
    });
  }, [client]);

  return (
    <View >
      <Text>Hello world!</Text>
    </View>
  );
}
