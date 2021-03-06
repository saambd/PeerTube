import { Account } from '@app/shared/account/account.model'
import { User } from '../'
import { Video as VideoServerModel } from '../../../../../shared'
import { getAbsoluteAPIUrl } from '../misc/utils'

export class Video implements VideoServerModel {
  accountName: string
  by: string
  createdAt: Date
  updatedAt: Date
  categoryLabel: string
  category: number
  licenceLabel: string
  licence: number
  languageLabel: string
  language: number
  description: string
  duration: number
  durationLabel: string
  id: number
  uuid: string
  isLocal: boolean
  name: string
  serverHost: string
  thumbnailPath: string
  thumbnailUrl: string
  previewPath: string
  previewUrl: string
  embedPath: string
  embedUrl: string
  views: number
  likes: number
  dislikes: number
  nsfw: boolean
  account: Account

  private static createDurationString (duration: number) {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    const minutesPadding = minutes >= 10 ? '' : '0'
    const secondsPadding = seconds >= 10 ? '' : '0'

    return minutesPadding + minutes.toString() + ':' + secondsPadding + seconds.toString()
  }

  constructor (hash: VideoServerModel) {
    const absoluteAPIUrl = getAbsoluteAPIUrl()

    this.accountName = hash.accountName
    this.createdAt = new Date(hash.createdAt.toString())
    this.categoryLabel = hash.categoryLabel
    this.category = hash.category
    this.licenceLabel = hash.licenceLabel
    this.licence = hash.licence
    this.languageLabel = hash.languageLabel
    this.language = hash.language
    this.description = hash.description
    this.duration = hash.duration
    this.durationLabel = Video.createDurationString(hash.duration)
    this.id = hash.id
    this.uuid = hash.uuid
    this.isLocal = hash.isLocal
    this.name = hash.name
    this.serverHost = hash.serverHost
    this.thumbnailPath = hash.thumbnailPath
    this.thumbnailUrl = absoluteAPIUrl + hash.thumbnailPath
    this.previewPath = hash.previewPath
    this.previewUrl = absoluteAPIUrl + hash.previewPath
    this.embedPath = hash.embedPath
    this.embedUrl = absoluteAPIUrl + hash.embedPath
    this.views = hash.views
    this.likes = hash.likes
    this.dislikes = hash.dislikes
    this.nsfw = hash.nsfw

    this.by = Account.CREATE_BY_STRING(hash.accountName, hash.serverHost)
  }

  isVideoNSFWForUser (user: User) {
    // If the video is NSFW and the user is not logged in, or the user does not want to display NSFW videos...
    return (this.nsfw && (!user || user.displayNSFW === false))
  }
}
