import { View, Text, Button, Navigator } from "@tarojs/components";
import { useEffect } from "react";
import { useMqttStore } from "@/store";
import mqttv437 from "@/utils/mqtt";
import { shallow } from "zustand/shallow";
import "./index.scss";

export default function Index() {
  const { client, initMqttClient, subscribeMqttTopic, unsubscribeMqttTopic } =
    useMqttStore((state) => {
      return {
        client: state.client,
        initMqttClient: state.initMqttClient,
        sendMqttMessage: state.sendMqttMessage,
        subscribeMqttTopic: state.subscribeMqttTopic,
        unsubscribeMqttTopic: state.unsubscribeMqttTopic,
      };
    }, shallow);
  const topic = "fujiahui";
  useEffect(() => {
    if (!client) return;
    client.on("connect", function () {
      console.log("连接成功");
    });
    client.on("reconnect", function () {
      console.log("正在重连");
    });
    client.on("message", function (topic1, message) {
      // message is Buffer
      console.log(topic1);
      console.log(message.toString());
    });
    client.on("error", function (error) {
      console.log(error);
    });
  }, [client]);

  // useEffect(()=>{
  //   let res =  mqttv437.connect(`wxs://broker.emqx.io:8084/mqtt`,{

  //   username: "test",
  //   password: "test",
  //   reconnectPeriod: 1000, // 1000毫秒，设置为 0 禁用自动重连，两次重新连接之间的间隔时间
  //   connectTimeout: 30 * 1000,
  //   protocolVersion: 4,
  //   clientId: "testfujiahui1111",
  // })
  // res.on("connect", function () {
  //   console.log("连接成功");
  //   res.subscribe(topic);
  // })
  // res.on("reconnect", function () {
  //   console.log("正在重连");
  // })
  // res.on("message", function (topic1, message) {
  //   // message is Buffer
  //   console.log(topic1)
  //   console.log(message.toString());
  // })
  // res.on("error", function (error) {
  //   console.log(error)
  // })

  // },[])
  return (
    <View>
      <Text>Hello world!</Text>
      <Button
        onClick={() => {
          initMqttClient({
            username: "test",
            password: "test",
            reconnectPeriod: 1000, // 1000毫秒，设置为 0 禁用自动重连，两次重新连接之间的间隔时间
            connectTimeout: 30 * 1000,
            protocolVersion: 4,
            clientId: "testfujiahui1111",
          });
        }}
      >
        点我链接服务器
      </Button>
      <Button
        onClick={() => {
          console.log(client);
          if (!client) return;
          if (!client.connected) return;
          client.subscribe(topic);
        }}
      >
        点我订阅一个主题
      </Button>
      <Button
        onClick={() => {
          console.log(client);
          if (!client) return;
          client.publish(topic, "hello world" + Math.random().toFixed(2));
        }}
      >
        点我发送一个主题下的消息
      </Button>
      <Button
        onClick={() => {
          if (!client) return;
          client.unsubscribe(topic);
        }}
      >
        点我取消订阅一个主题
      </Button>
      <Navigator url='/pages/another/index'  >去another</Navigator>
    </View>
  );
}
