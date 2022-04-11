import { Event } from "./datamodel/Event";
import { InteractionCreateEvent } from "./events/InteractionCreateEvent";
import { ReadyEvent } from "./events/ReadyEvent";


export const Events: Event[] = [InteractionCreateEvent, ReadyEvent];