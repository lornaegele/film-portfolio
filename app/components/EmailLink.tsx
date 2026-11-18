const EMAIL = "lorenznaegele@mail.de";

/** Big email address; clicking it opens a new email in the visitor's mail app. */
export default function EmailLink() {
  return (
    <a className="mail" href={`mailto:${EMAIL}`} data-cursor="Write">
      {EMAIL}
    </a>
  );
}
