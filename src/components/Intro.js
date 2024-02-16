//heroicons import
import { UserPlusIcon } from "@heroicons/react/24/solid";
//assets import
import illustration from "../assets/illustration.jpg";
//rrd imports
import { Form } from "react-router-dom";
export default function Intro() {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secrets to the financial freedom. Start your
          journey today.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" required />
          <button type="submit" className="btn btn--dark btn-dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Illustration Image" width={600} />
    </div>
  );
}
