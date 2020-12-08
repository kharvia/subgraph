import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  NewGravatar,
  UpdatedGravatar
} from "../generated/Contract/Contract"
import { Gravatar, Status} from "../generated/schema"

export function handleNewGravatar(event: NewGravatar): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Gravatar.load(event.params.id.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Gravatar(event.params.id.toHex())
  }

  // Entity fields can be set using simple assignments
  entity.displayName=event.params.displayName
  entity.imageUrl=event.params.imageUrl
  entity.owner=event.params.owner
  entity.save()

  let countent=Status.load('1')
  if (countent==null) {
    countent = new Status('1')
    countent.gravatarCount=BigInt.fromI32(0)
  }
  countent.gravatarCount=countent.gravatarCount+BigInt.fromI32(1)
  countent.save()
}


export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  let entity = Gravatar.load(event.params.id.toHex())
  if (entity==null){
    entity=new Gravatar(event.params.id.toHex())
  }
  entity.displayName=event.params.displayName
  entity.imageUrl=event.params.imageUrl
  entity.owner=event.params.owner
  entity.save()
}