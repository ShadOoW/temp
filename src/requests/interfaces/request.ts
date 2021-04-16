export interface IRequest {
  id: string;
  title: string;
  excerpt: string;
  status: string;
}

export class RequestCreatedEvent {
  name: string;
  description: string;
}
