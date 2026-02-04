export interface Project {
  _id:                string;
  title:              string;
  projectPlan:        ProjectPlan;
  status:             ProjectStatus; 
  img:                string;
  lastVisit:          string | Date; 
  position:           Position;
  users:              User[];
  clientData:         ClientData;
  city:               string;
  lastUpdated:        string | Date;
  partnerClients:     PartnerClient[];
  companyId:          string;
  address:            string;
  projectClientAdmin: string[];
  projectPlanData:    ProjectPlanData;
  createdAt:          string | Date;
  incidents:          Incident[];
  country?:           number | string;
}

export interface User {
    name:     string;
    lastName: string;
}

export interface ClientData {
    title: string;
    _id:   string;
}

export interface ProjectPlan {
    _id: ID;
}

export interface PartnerClient {
    _id:        string;
    maxUsers:   number;
    maxAdmins:  number;
    maxStorage: number;
}

export interface ProjectPlanData {
    plan: Plan;
}

export enum ID {
    The6385140Fe518625Cb607F288 = '6385140fe518625cb607f288',
    The63C1Dcc858A3475C2Af52Ee0 = '63c1dcc858a3475c2af52ee0',
    The63Eb939A0E6F087E2592012B = '63eb939a0e6f087e2592012b',
    The6508Cbab34B46D2006707B94 = '6508cbab34b46d2006707b94',
}

export enum ProjectStatus {
  Active = 'active',
  Inactive = 'inactive',
  PendingPayment = 'pending_payment',
  Suspended = 'suspended',
}

export enum Plan {
    Big = 'big',
    Small = 'small',
}

export enum IncidentStatus {
    Active = 'active',
    Close = 'close',
}

export enum Item {
    Incidents = 'incidents',
    RFI = 'RFI',
    Task = 'task',
}

export enum Tag {
    Abroad = 'abroad',
    Inside = 'inside',
}


export interface Position {
  _id: string;
  lat: number;
  lng: number;
}

export interface Incident {
  _id:         string;
  status:      IncidentStatus;
  item:        Item;
  description: string;
  owner:       string;
  tag:         Tag;
  coordinates: Coordinates;
  limitDate:   string | Date;
  createdAt:   string | Date;
  updatedAt:   string | Date;
}

export interface Coordinates {
  lat: number;
  lng: number;
}


