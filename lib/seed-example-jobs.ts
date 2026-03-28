import { Column, JobApplication } from "@/lib/models";

export async function seedExampleJobs(userId: string, boardId: string) {
  const columns = await Column.find({ boardId }).sort({ order: 1 });

  const SAMPLE_JOBS = [
    {
      column: "Wish List",
      data: {
        company: "Google",
        position: "Frontend Engineer",
        location: "Remote",
        tags: ["React", "TypeScript", "Performance"],
        description: "Build high-performance user interfaces used by millions.",
        jobUrl: "https://careers.google.com/jobs/results/",
        salary: "$130k - $180k",
      },
    },
    {
      column: "Wish List",
      data: {
        company: "Spotify",
        position: "Backend Engineer",
        location: "Stockholm",
        tags: ["Node.js", "Microservices", "AWS"],
        description:
          "Work on scalable backend systems powering music streaming.",
        jobUrl: "https://www.lifeatspotify.com/jobs",
        salary: "$110k - $150k",
      },
    },
    {
      column: "Wish List",
      data: {
        company: "Notion",
        position: "Product Designer",
        location: "Remote",
        tags: ["Figma", "UX", "Design Systems"],
        description: "Design intuitive productivity tools used worldwide.",
        jobUrl: "https://www.notion.so/careers",
        salary: "$100k - $140k",
      },
    },

    {
      column: "Applied",
      data: {
        company: "Stripe",
        position: "Full Stack Developer",
        location: "Remote",
        tags: ["React", "Node.js", "APIs"],
        description: "Build financial tools and improve developer experience.",
        jobUrl: "https://stripe.com/jobs",
        salary: "$120k - $160k",
      },
    },
    {
      column: "Applied",
      data: {
        company: "Airbnb",
        position: "Data Analyst",
        location: "Berlin",
        tags: ["SQL", "Python", "Data Visualization"],
        description: "Analyze user data to improve product decisions.",
        jobUrl: "https://careers.airbnb.com",
        salary: "$90k - $120k",
      },
    },

    {
      column: "Interviewing",
      data: {
        company: "Wise",
        position: "Mobile Developer",
        location: "London",
        tags: ["Flutter", "Dart", "Mobile"],
        description:
          "Build mobile experiences for international money transfers.",
        jobUrl: "https://wise.jobs",
        salary: "$100k - $130k",
      },
    },
    {
      column: "Offer",
      data: {
        company: "Microsoft",
        position: "Cloud Engineer",
        location: "Dublin",
        tags: ["Azure", "Cloud", "Infrastructure"],
        description:
          "Work on cloud infrastructure powering enterprise solutions.",
        jobUrl: "https://careers.microsoft.com",
        salary: "$120k - $160k",
      },
    },
    {
      column: "Offer",
      data: {
        company: "Amazon",
        position: "DevOps Engineer",
        location: "Seattle",
        tags: ["AWS", "CI/CD", "Infrastructure"],
        description:
          "Manage scalable cloud infrastructure and deployment pipelines.",
        jobUrl: "https://www.amazon.jobs/en/",
        salary: "$125k - $155k",
      },
    },
    {
      column: "Rejected",
      data: {
        company: "Facebook",
        position: "Machine Learning Engineer",
        location: "Menlo Park",
        tags: ["Python", "TensorFlow", "ML"],
        description:
          "Develop and optimize machine learning models for social media features.",
        jobUrl: "https://www.meta.com/careers",
        salary: "$130k - $170k",
      },
    },
  ];

  for (const item of SAMPLE_JOBS) {
    const column = columns.find((c) => c.name === item.column);
    if (!column) continue;

    const job = await JobApplication.create({
      ...item.data,
      columnId: column._id,
      boardId,
      userId,
      isExample: true,
      order: 0,
    });

    column.jobApplications.push(job._id);
    await column.save();
  }
}
