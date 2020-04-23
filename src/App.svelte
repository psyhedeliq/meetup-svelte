<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 8 weeks",
      description:
        "In this meetup we will have some experts that teach you how to code!",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/09/08/04/12/programmer-1653351_1280.png",
      address: "5th Avenue Road, 323454 Los Angeles",
      contactEmail: "code@test.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Karate Lessons",
      subtitle: "Get your black belt",
      description: "In this karate course you will learn to defend yourself!",
      imageUrl:
        "https://cdn.pixabay.com/photo/2017/11/21/12/45/karate-2968106_1280.jpg",
      address: "17th Middle Park, SE9 5HS London",
      contactEmail: "karate@test.com",
      isFavorite: false
    }
  ];

  const addMeetup = () => {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      contactEmail: email,
      address: address
    };

    meetups = [newMeetup, ...meetups];
  };

  const toggleFavorite = event => {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find(meetup => meetup.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(meetup => meetup.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  };
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      value={description}
      on:input={event => (description = event.target.value)} />
    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
