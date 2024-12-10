import type { ChannelController } from "../../proto/spawner/channel/v1/channel_pb";
import type { InputFilterEvent } from "../../proto/spawner/input_filter/v1/input_filter_pb";
import type { EmotionEvent } from "../../proto/spawner/emotion/v1/emotion_pb";
import type { KnowledgeEvent } from "../../proto/spawner/knowledge/v1/knowledge_pb";
import type { SentimentEvent } from "../../proto/spawner/sentiment/v1/sentiment_pb";
import type { PromptInjectionEvent } from "../../proto/spawner/prompt_injection/v1/prompt_injection_pb";
import type { WorldController } from "../../proto/spawner/world/v1/world_pb";
import type { AgentEvent } from "../../proto/spawner/agent/v1/agent_pb";
import type { SpawnerPacket } from "../../proto/spawner/packet/v1/packet_pb";

// 型ガード関数: "channelController" の場合
function isChannelController(payload: any): payload is { case: "channelController"; value: ChannelController } {
  return payload.case === "channelController" && typeof payload.value === 'object' && payload.value !== null;
}

// 型ガード関数: "text" の場合
function isText(payload: any): payload is { case: "text"; value: TextEvent } {
  return payload.case === "text" && typeof payload.value === 'object' && payload.value !== null;
}

// 型ガード関数: "inputFilter" の場合
function isInputFilter(payload: any): payload is { case: "inputFilter"; value: InputFilterEvent } {
  return payload.case === "inputFilter" && typeof payload.value === 'object' && payload.value !== null;
}

// 型ガード関数: "emotion" の場合
function isEmotion(payload: any): payload is { case: "emotion"; value: EmotionEvent } {
  return payload.case === "emotion" && typeof payload.value === 'object' && payload.value !== null;
}

// 型ガード関数: "knowledge" の場合
function isKnowledge(payload: any): payload is { case: "knowledge"; value: KnowledgeEvent } {
  return payload.case === "knowledge" && typeof payload.value === 'object' && payload.value !== null;
}

// 型ガード関数: "sentiment" の場合
function isSentiment(payload: any): payload is { case: "sentiment"; value: SentimentEvent } {
  return payload.case === "sentiment" && typeof payload.value === 'object' && payload.value !== null;
}

// 型ガード関数: "promptInjection" の場合
function isPromptInjection(payload: any): payload is { case: "promptInjection"; value: PromptInjectionEvent } {
  return payload.case === "promptInjection" && typeof payload.value === 'object' && payload.value !== null;
}

// 型ガード関数: "worldController" の場合
function isWorldController(payload: any): payload is { case: "worldController"; value: WorldController } {
  return payload.case === "worldController" && typeof payload.value === 'object' && payload.value !== null;
}

// 型ガード関数: "agent" の場合
function isAgent(payload: any): payload is { case: "agent"; value: AgentEvent } {
  return payload.case === "agent" && typeof payload.value === 'object' && payload.value !== null;
}

// 型ガード関数: undefinedの場合
function isUndefinedCase(payload: any): payload is { case: undefined; value?: undefined } {
  return payload.case === undefined;
}


// スポーンパケット型ガード関数
export const isSpawnerPacket = (message: any): message is SpawnerPacket => {
  return (isChannelController(message.payload) || 
          isText(message.payload) || 
          isInputFilter(message.payload) || 
          isEmotion(message.payload) || 
          isKnowledge(message.payload) || 
          isSentiment(message.payload) || 
          isPromptInjection(message.payload) || 
          isWorldController(message.payload) || 
          isAgent(message.payload) || 
          !isUndefinedCase(message.payload));
}
