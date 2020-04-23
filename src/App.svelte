<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 8 weeks",
      description: "In this Bootcamp you will write your first line of code!",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/11/18/18/37/programming-1836330_1280.png",
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
        "https://cdn.pixabay.com/photo/2019/02/17/17/11/karate-4002687_1280.png",
      address: "17th Middle Park, SE9 5HS London",
      contactEmail: "karate@test.com",
      isFavorite: false
    }
  ];

  let editMode;

  const addMeetup = event => {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      contactEmail: event.detail.email,
      address: event.detail.address
    };
    // console.log(newMeetup);

    meetups = [newMeetup, ...meetups];

    editMode = null;
  };

  const toggleFavorite = event => {
    // console.log(event);
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

  .button-new-meetup {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="button-new-meetup">
    <Button caption="New Meetup" on:click={() => (editMode = 'add')} />
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
