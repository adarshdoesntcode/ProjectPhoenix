import { Button } from "@/components/ui/button";
import { ROLES_LIST } from "@/lib/config";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery } from "../adminApiSlice";
import { allEventColumns } from "./EventColumn";
import {
  Activity,
  CirclePlus,
  CreditCard,
  DollarSign,
  Loader2,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { File } from "lucide-react";

import { DataTable } from "./EventDataTable";

const fakeData = [
  {
    eventId: "ET-24001L",
    eventName: "PROJECT 2 ",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "2",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: true,
      defenseDate: "2024-08-10T12:00:00.000Z",
      reportDeadline: "2024-08-05T12:00:00.000Z",
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    projects: [],
    year: 2024,
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },

  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
  {
    eventId: "ET-24101A",

    eventName: "PROJECT 1",
    description: "This is a description of the example event.",
    eventTarget: "72354",
    eventType: "0",
    eventStatus: "101",
    proposal: {
      defense: true,
      defenseDate: "2024-05-20T12:00:00.000Z",
      reportDeadline: "2024-05-15T12:00:00.000Z",
    },
    mid: {
      defense: false,
      defenseDate: null,
      reportDeadline: null,
    },
    final: {
      defense: true,
      defenseDate: "2024-10-10T12:00:00.000Z",
      reportDeadline: "2024-10-05T12:00:00.000Z",
    },
    year: 2024,
    projects: [],
    author: {
      _id: "6641e5e1093be8f942f5832a",
      email: "nikesh.191624@ncit.edu.np",
      fullname: "Nikesh Gamal",
      phoneNumber: "9815523654",
      __v: 0,
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocIfXPQaBjP6VTLLG3HfrhvLWMlocO6G09-PGOUrKlMAwkF0cDk=s96-c",
      updatedAt: "2024-05-15T09:56:48.390Z",
    },
    _id: "66449b2702335f8d476ea97d",
    createdAt: "2024-05-15T11:23:19.718Z",
    updatedAt: "2024-05-15T11:23:19.718Z",
    __v: 0,
  },
];

function AdminEvents() {
  const {
    data: events,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllEventsQuery();

  console.log(events);
  let content;

  if (isLoading) {
    content = (
      <div className="flex flex-1 items-center justify-center text-gray-600  bg-slate-50 ">
        <Loader2 className="h-6 w-6 animate-spin mr-4" />
      </div>
    );
  } else if (isSuccess) {
    if (events.data.length === 0) {
      content = (
        <div className="flex flex-1 items-center justify-center bg-slate-50 ">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Events
            </h3>

            <p className="text-sm text-gray-500">
              You can start as soon as you add an event.
            </p>

            <Button className="mt-4" asChild>
              <Link to={`/${ROLES_LIST.admin}/events/new`}>
                Create an Event
              </Link>
            </Button>
          </div>
        </div>
      );
    } else {
      content = (
        <>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Hosted Events
                </CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.data.length}</div>
                <p className="text-xs text-gray-500">events have been hosted</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Events
                </CardTitle>
                <Activity className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-gray-500">+201 since last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Developing Projects
                </CardTitle>
                <CreditCard className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-gray-500">+19% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Complete Events
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-gray-500">+180.1% from last year</p>
              </CardContent>
            </Card>
          </div>
          <Tabs className="mt-4" defaultValue="active">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="complete">Complete</TabsTrigger>
                <TabsTrigger value="archive">Archive</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-10 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
                <Button size="sm" className="h-10 gap-1 text-sm" asChild>
                  <Link to="new">
                    <CirclePlus className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">New Event</span>
                  </Link>
                </Button>
              </div>
            </div>
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>Active Events</CardTitle>
                  <CardDescription>
                    Currently active events on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable columns={allEventColumns} data={events.data} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="complete">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Events</CardTitle>
                  <CardDescription>
                    All the completed events on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable columns={allEventColumns} data={events.data} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="archive">
              <Card>
                <CardHeader>
                  <CardTitle>Archived Events</CardTitle>
                  <CardDescription>
                    All the achived events on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable columns={allEventColumns} data={events.data} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Events</CardTitle>
                  <CardDescription>
                    All the events on the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable columns={allEventColumns} data={events.data} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      );
    }
  }

  return content;
}

export default AdminEvents;
