export function Error({ messages = ['Ocorreu um erro inesperado, tente novamente mais tarde.'] }) {
  return (
    <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">Mensagens de erro!</h4>
      <hr />
      {messages.map((message, index) => (
        <p class="mb-0" key={index}>{message}</p>
      ))}
    </div>
  );
}

export function Warning({ title, messages = [] }) {
  return (
    <div className="alert alert-warning" role="alert">
      <h4 className="alert-heading">{title}</h4>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
