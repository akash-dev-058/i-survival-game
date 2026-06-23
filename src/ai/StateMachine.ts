type StateHandler = (delta: number) => void;

/** Simple finite state machine */
export class StateMachine {
  private current: string;
  private states: Map<string, StateHandler> = new Map();

  constructor(initial: string) {
    this.current = initial;
  }

  public addState(name: string, handler: StateHandler): void {
    this.states.set(name, handler);
  }

  public transition(to: string): void {
    if (this.states.has(to)) {
      this.current = to;
    }
  }

  public update(delta: number): void {
    const handler = this.states.get(this.current);
    if (handler) handler(delta);
  }
}
