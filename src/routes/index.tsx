// SolidJS
import { createEffect, createResource, createSignal, Show } from "solid-js";
import { createLocalStorage } from "@solid-primitives/storage";
import { Icon } from "solid-heroicons";
import { chatAlt_2, arrowRight, menu } from "solid-heroicons/solid";

// CSS
import "~/styles/globals.css";
import "~/styles/index.css";

// Components
import Header from "~/components/Header";

// API
import { me } from "~/lib/user/me";
import { logout } from "~/lib/user/logout";

import { localStore } from "~/root";
import { Link } from "solid-app-router";

export default function Home() {
  const [sessionToken, setSessionToken] = createSignal(null); // Session Token
  const [userResource] = createResource(sessionToken, me); // The user resource
  const [userObject, setUserObject] = createSignal(null); // User object

  // Check if theres an active session
  if (localStore.session) {
    setSessionToken(localStore.session);
  }

  createEffect(() => {
    try {
      if (!userResource.loading) {
        console.log("User id: " + userResource().id);
        setUserObject(userResource());
      }
    } catch (e) {}
  });

  return (
    <main>
      <div class="app-header">
        <p class="brand">
          <Icon path={chatAlt_2} /> FreeSpeech <span>AAC</span>
        </p>
        <div class="nav-item">
          <p>item 1</p>
        </div>
        <div class="nav-item">
          <p>item 2</p>
        </div>
        <div class="mobile-spacer">

        </div>
        <div class="mobile-menu nav-item">
          <Icon style="width: 30px;" path={menu} />
        </div>
      </div>
      <div class="hero-container">
        <div class="left-hero-bg"></div>
        <div class="right-hero-bg"></div>
        <div class="corner-piece">
          <div class="inner-piece"></div>
        </div>
       
        <div class="hero-content">
          <div class="hero-new">
            <span>NEW</span> Apply for the FreeSpeech beta{" "}
            <Icon path={arrowRight} />
          </div>
          <div class="hero-text">
            <p>AAC is just <br class="hero-text-break" /> <span>a tap away.</span></p>
            <p class="hero-desc">With FreeSpeech, AAC is accessible to just about anyone who needs it. Our mission is to offer a web-based AAC application with an intuitevly rhobust set of features, it's simple as that. When you start adapting your vocabulary into FreeSpeech, we promise you just might enjoy using AAC.</p>
            <img class="blob-img" src="/blob.svg" />
            <img
              class="bubbly-img"
              src="/handy-line-running-silver-speechbubble.svg"
            />
          </div>
          {/* 
           */}
        </div>
      </div>
      {/* <Show when={!userObject()}>
        <Link href="/login">login</Link>
        <Link href="/signup">signup</Link>
      </Show>
      <Show when={userObject()}>
        <p>{JSON.stringify(userObject())}</p>
        <button onClick={async () => {await logout(userObject().id); window.location.assign('/')}}>Logout</button>
      </Show> */}
    </main>
  );
}