<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";

  // let meetups = ;

  let editMode;
  let page = "overview";
  let pageData = {};

  const addMeetup = event => {
    // console.log(event);
    editMode = null;
  };

  const cancelEdit = () => {
    editMode = null;
  };

  const showDetails = event => {
    page = "details";
    pageData.id = event.detail;
  };

  const closeDetails = () => {
    page = "overview";
    // reset the page data, remove the id property so to say
    pageData = {};
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
  {#if page === 'overview'}
    <div class="button-new-meetup">
      <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
    </div>
    {#if editMode === 'add'}
      <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid meetups={$meetups} on:showdetails={showDetails} />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
