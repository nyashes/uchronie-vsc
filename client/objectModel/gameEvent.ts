namespace objectModel {
    export class gameEvent {
        action: () => any;
        text: string;
        eventClass: nonDeterministicState<string>;

        public constructor(action: () => any, text: string, eventClass: string, at?: number) {
            if (at == undefined)
                at = currentTime;

            this.action = action;
            this.text = text;
            this.eventClass = new nonDeterministicState<string>();
            this.eventClass.setKeyFrame(at-1, "discared");
            this.eventClass.setKeyFrame(at, eventClass);
        }
    }
}