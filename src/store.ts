import { createWithEqualityFn } from 'zustand/traditional'
import { IClientOptions, MqttClient } from 'mqtt';
import mqtt from "@/utils/mqtt";
import { shallow } from 'zustand/shallow';

interface IMqttStore {
  client: MqttClient | null,
  initMqttClient: (options: IClientOptions) => void,
  clearMqttClient: () => void,
  sendMqttMessage: (topic: string, message: string) => void,
  subscribeMqttTopic: (topic: string) => void,
  unsubscribeMqttTopic: (topic: string) => void,
}
export const useMqttStore = createWithEqualityFn<IMqttStore>((set, get) => ({
  client: null,
  initMqttClient:async (options: IClientOptions) => {
    const client =  mqtt.connect(`wxs://broker.emqx.io:8084/mqtt`, options)
    console.log(client)
    set({ client })
  },
  clearMqttClient: () => {
    get().client?.end()
    set({
      client: null
    })
  },
  sendMqttMessage: (topic: string, message: string) => {
    get().client?.publish(topic, message)
  },
  subscribeMqttTopic: (topic: string) => {
    get().client?.subscribe(topic)
  },
  unsubscribeMqttTopic: (topic: string) => {
    get().client?.unsubscribe(topic)
  },

}), shallow)