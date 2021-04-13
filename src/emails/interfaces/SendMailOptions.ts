export interface SendMailOptions<P> {
  type: string;
  to: string;
  from?: string;
  subject: string;
  params: P;
}
