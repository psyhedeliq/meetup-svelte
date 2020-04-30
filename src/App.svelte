<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  // let meetups = ;

  let editMode;

  const addMeetup = event => {
    console.log(event);
    const meetupData = {
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      contactEmail: event.detail.email,
      address: event.detail.address
    };
    // console.log(newMeetup);

    meetups.addMeetup(meetupData);
    editMode = null;
  };

  const toggleFavorite = event => {
    // console.log(event);
    const id = event.detail;
    meetups.toggleFavorite(id);
  };

  const cancelEdit = () => {
    editMode = null;
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
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid meetups={$meetups} on:togglefavorite={toggleFavorite} />
</main>
