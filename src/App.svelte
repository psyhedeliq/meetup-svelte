<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

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
      contactEmail: "code@test.com"
    },
    {
      id: "m2",
      title: "Karate Lessons",
      subtitle: "Get your black belt",
      description: "In this karate course you will learn to defend yourself!",
      imageUrl:
        "https://cdn.pixabay.com/photo/2017/11/21/12/45/karate-2968106_1280.jpg",
      address: "17th Middle Park, SE9 5HS London",
      contactEmail: "karate@test.com"
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
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} />
    </div>
    <div class="form-control">
      <label for="subtitle">Subtitle</label>
      <input type="text" id="subtitle" bind:value={subtitle} />
    </div>
    <div class="form-control">
      <label for="address">Address</label>
      <input type="text" id="address" bind:value={address} />
    </div>
    <div class="form-control">
      <label for="imageUrl">Image URL</label>
      <input type="text" id="imageUrl" bind:value={imageUrl} />
    </div>
    <div class="form-control">
      <label for="email">E-Mail</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea rows="3" id="description" bind:value={description} />
    </div>
    <button type="submit">Save</button>
  </form>
  <MeetupGrid {meetups} />
</main>
