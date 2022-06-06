import React from 'react'

function Contact() {
  return (
    <a
      href="#"
      className="list-group-item list-group-item-action py-3 lh-tight"
    >
      <div className="d-flex w-100 align-items-center justify-content-between">
        <strong className="mb-1">Chat name</strong>
        <small className="text-muted"> time/date</small>
      </div>
      <div className="col-10 mb-1 small">Last message content ...</div>
    </a>
  );
}

export default Contact